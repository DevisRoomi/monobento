package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"monobento/backend/handlers"
	"monobento/backend/middleware"
	"monobento/backend/store"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	dataFile := "data/store.json"
	s, err := store.NewStore(dataFile)
	if err != nil {
		log.Fatalf("Failed to initialize store: %v", err)
	}

	api := handlers.NewAPI(s)

	mux := http.NewServeMux()

	// Public Endpoints
	mux.HandleFunc("GET /api/health", api.HealthHandler)
	mux.HandleFunc("POST /api/auth/login", api.LoginHandler)
	mux.HandleFunc("GET /api/profile", api.ProfileHandler)
	mux.HandleFunc("GET /api/projects", api.GetProjectsHandler)
	mux.HandleFunc("POST /api/inquiries", api.CreateInquiryHandler)

	// Protected Endpoints (JWT Required)
	mux.HandleFunc("GET /api/auth/me", middleware.RequireAuth(api.MeHandler))
	mux.HandleFunc("POST /api/projects", middleware.RequireAuth(api.CreateProjectHandler))
	mux.HandleFunc("DELETE /api/projects/{id}", middleware.RequireAuth(api.DeleteProjectHandler))
	mux.HandleFunc("GET /api/inquiries", middleware.RequireAuth(api.GetInquiriesHandler))

	// Catch-all 404
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			w.Header().Set("Content-Type", "application/json")
			fmt.Fprintf(w, `{"name":"MonoBento RESTful API","version":"1.0.0","status":"operational","docs":"/api/health"}`)
			return
		}
		http.NotFound(w, r)
	})

	handler := middleware.CORS(mux)

	addr := ":" + port
	log.Printf("==================================================")
	log.Printf("  MonoBento Golang RESTful API Server")
	log.Printf("  Listening on http://127.0.0.1%s", addr)
	log.Printf("  JWT Auth Enabled • net/http Router Stdlib")
	log.Printf("==================================================")

	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
