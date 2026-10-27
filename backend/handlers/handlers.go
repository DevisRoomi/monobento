package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"runtime"
	"strings"
	"time"

	"monobento/backend/middleware"
	"monobento/backend/models"
	"monobento/backend/store"
)

type API struct {
	store     *store.Store
	startTime time.Time
}

func NewAPI(s *store.Store) *API {
	return &API{
		store:     s,
		startTime: time.Now(),
	}
}

func (api *API) HealthHandler(w http.ResponseWriter, r *http.Request) {
	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	uptime := time.Since(api.startTime).Round(time.Second).String()
	allocMB := fmt.Sprintf("%.2f MB", float64(m.Alloc)/1024/1024)

	res := models.HealthResponse{
		Status:      "operational",
		Uptime:      uptime,
		GoVersion:   runtime.Version(),
		Goroutines:  runtime.NumGoroutine(),
		MemoryAlloc: allocMB,
		Framework:   "net/http (Go Stdlib Router)",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func (api *API) LoginHandler(w http.ResponseWriter, r *http.Request) {
	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"Invalid request payload"}`, http.StatusBadRequest)
		return
	}

	user, ok := api.store.Authenticate(strings.TrimSpace(req.Username), strings.TrimSpace(req.Password))
	if !ok {
		http.Error(w, `{"error":"Invalid username or password"}`, http.StatusUnauthorized)
		return
	}

	token, err := middleware.GenerateToken(*user)
	if err != nil {
		http.Error(w, `{"error":"Failed to sign JWT token"}`, http.StatusInternalServerError)
		return
	}

	res := models.LoginResponse{
		Token: token,
		User:  *user,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func (api *API) MeHandler(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value(middleware.UserContextKey).(*middleware.Claims)
	if !ok {
		http.Error(w, `{"error":"No claims in context"}`, http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"user_id":  claims.UserID,
		"username": claims.Username,
		"role":     claims.Role,
	})
}

func (api *API) ProfileHandler(w http.ResponseWriter, r *http.Request) {
	profile := api.store.GetProfile()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

func (api *API) GetProjectsHandler(w http.ResponseWriter, r *http.Request) {
	projects := api.store.GetProjects()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}

func (api *API) CreateProjectHandler(w http.ResponseWriter, r *http.Request) {
	var p models.Project
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, `{"error":"Invalid project body"}`, http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(p.Title) == "" {
		http.Error(w, `{"error":"Title is required"}`, http.StatusBadRequest)
		return
	}

	created, err := api.store.AddProject(p)
	if err != nil {
		http.Error(w, `{"error":"Failed to save project"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(created)
}

func (api *API) DeleteProjectHandler(w http.ResponseWriter, r *http.Request) {
	// Pattern is /api/projects/{id}
	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 4 || pathParts[3] == "" {
		http.Error(w, `{"error":"Missing project ID"}`, http.StatusBadRequest)
		return
	}

	id := pathParts[3]
	deleted, err := api.store.DeleteProject(id)
	if err != nil {
		http.Error(w, `{"error":"Failed to delete project"}`, http.StatusInternalServerError)
		return
	}
	if !deleted {
		http.Error(w, `{"error":"Project not found"}`, http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{"deleted": true, "id": id})
}

func (api *API) CreateInquiryHandler(w http.ResponseWriter, r *http.Request) {
	var inq models.Inquiry
	if err := json.NewDecoder(r.Body).Decode(&inq); err != nil {
		http.Error(w, `{"error":"Invalid inquiry body"}`, http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(inq.Name) == "" || strings.TrimSpace(inq.Email) == "" || strings.TrimSpace(inq.Message) == "" {
		http.Error(w, `{"error":"Name, email, and message are required"}`, http.StatusBadRequest)
		return
	}

	created, err := api.store.AddInquiry(inq)
	if err != nil {
		http.Error(w, `{"error":"Failed to save inquiry"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(created)
}

func (api *API) GetInquiriesHandler(w http.ResponseWriter, r *http.Request) {
	inquiries := api.store.GetInquiries()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(inquiries)
}
