package store

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"time"

	"monobento/backend/models"
)

type Store struct {
	mu        sync.RWMutex
	filePath  string
	Profile   models.Profile   `json:"profile"`
	Projects  []models.Project `json:"projects"`
	Inquiries []models.Inquiry `json:"inquiries"`
	Users     []models.User    `json:"users"`
}

func NewStore(dataFile string) (*Store, error) {
	s := &Store{
		filePath: dataFile,
	}

	if err := s.loadOrSeed(); err != nil {
		return nil, err
	}

	return s, nil
}

func (s *Store) loadOrSeed() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, err := os.Stat(s.filePath); err == nil {
		data, err := os.ReadFile(s.filePath)
		if err == nil {
			if err := json.Unmarshal(data, s); err == nil && len(s.Projects) > 0 {
				return nil
			}
		}
	}

	// Seed data
	s.Profile = models.Profile{
		Name:         "Devis Roomi",
		Handle:       "@devisroomi",
		Role:         "Fullstack Golang & React Engineer",
		Bio:          "Crafting high-throughput REST APIs with Golang and ultra-crisp monochromatic interfaces with React + TypeScript. Obsessed with simplicity, performance, and clean architecture.",
		Location:     "Indonesia",
		Timezone:     "UTC+07:00 (WIB)",
		Availability: "Available for High-Impact Projects",
		AvatarURL:    "https://github.com/DevisRoomi.png",
		Socials: map[string]string{
			"github":   "https://github.com/DevisRoomi",
			"email":    "abudevis5@gmail.com",
			"linkedin": "https://linkedin.com/in/devisroomi",
		},
		Stats: map[string]any{
			"repos":          19,
			"commits_year":   412,
			"uptime":         "99.98%",
			"system_latency": "0.14ms",
		},
	}

	now := time.Now()
	s.Projects = []models.Project{
		{
			ID:        "proj-1",
			Title:     "MonoBento",
			Tagline:   "Monochromatic Bento Grid Dev Portfolio & Content Node",
			Category:  "Fullstack System",
			TechStack: []string{"Golang", "net/http", "JWT", "React 19", "TypeScript", "TanStack Query", "Tailwind CSS"},
			GithubURL: "https://github.com/DevisRoomi/monobento",
			LiveURL:   "http://monobento.test",
			Metrics:   "0.14ms API Latency • 100/100 Lighthouse",
			Featured:  true,
			ColSpan:   2,
			RowSpan:   2,
			CreatedAt: now.Add(-1 * time.Hour),
		},
		{
			ID:        "proj-2",
			Title:     "FerrisHub",
			Tagline:   "Modern Rust Axum 0.7 + Vue 3 Neo-Grotesk Bento Dashboard",
			Category:  "Systems & Microservices",
			TechStack: []string{"Rust", "Axum", "Vue 3", "Tailwind CSS", "JWT"},
			GithubURL: "https://github.com/DevisRoomi/ferris-hub",
			Metrics:   "Native Multi-threaded • Zero Alloc Router",
			Featured:  true,
			ColSpan:   1,
			RowSpan:   1,
			CreatedAt: now.Add(-24 * time.Hour),
		},
		{
			ID:        "proj-3",
			Title:     "Duitin",
			Tagline:   "Personal Finance & Cash Flow Tracker for Students",
			Category:  "FinTech Web App",
			TechStack: []string{"Golang / Rust", "React", "TypeScript", "FlyEnv MySQL"},
			GithubURL: "https://github.com/DevisRoomi/Duitin",
			Metrics:   "IDR Ledger Accuracy • Offline First",
			Featured:  false,
			ColSpan:   1,
			RowSpan:   1,
			CreatedAt: now.Add(-48 * time.Hour),
		},
		{
			ID:        "proj-4",
			Title:     "Capyquest",
			Tagline:   "Gamified Santri Coding Journey & Roadmap Engine",
			Category:  "EdTech Platform",
			TechStack: []string{"Bun", "Hono", "React", "SQLite"},
			GithubURL: "https://github.com/DevisRoomi/Capyquest",
			Metrics:   "Sub-millisecond Edge Response",
			Featured:  false,
			ColSpan:   2,
			RowSpan:   1,
			CreatedAt: now.Add(-72 * time.Hour),
		},
		{
			ID:        "proj-5",
			Title:     "GearFlow",
			Tagline:   "Lab & Multimedia Equipment Lending Management System",
			Category:  "Enterprise ERP",
			TechStack: []string{"Laravel", "Livewire", "MySQL", "Tailwind CSS"},
			GithubURL: "https://github.com/DevisRoomi/gearflow",
			Metrics:   "Barcode Check-in/out • Audit Log",
			Featured:  false,
			ColSpan:   1,
			RowSpan:   1,
			CreatedAt: now.Add(-96 * time.Hour),
		},
	}

	s.Users = []models.User{
		{
			ID:       "usr-admin",
			Username: "admin",
			Password: "gopher123", // pony tail: demo in-memory hash. Upgrade to bcrypt when prod DB wired.
			Name:     "Devis Roomi (Admin)",
			Role:     "lead_developer",
		},
	}

	s.Inquiries = []models.Inquiry{
		{
			ID:        "inq-1",
			Name:      "Tech Recruiter",
			Email:     "lead@innovate.tech",
			Message:   "Impressed with your monochromatic bento portfolio! Let's connect.",
			CreatedAt: now.Add(-2 * time.Hour),
		},
	}

	return s.saveUnlocked()
}

func (s *Store) saveUnlocked() error {
	dir := filepath.Dir(s.filePath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}
	bytes, err := json.MarshalIndent(s, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(s.filePath, bytes, 0644)
}

func (s *Store) GetProfile() models.Profile {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.Profile
}

func (s *Store) GetProjects() []models.Project {
	s.mu.RLock()
	defer s.mu.RUnlock()
	copied := make([]models.Project, len(s.Projects))
	copy(copied, s.Projects)
	return copied
}

func (s *Store) AddProject(p models.Project) (models.Project, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	p.ID = fmt.Sprintf("proj-%d", time.Now().UnixNano())
	p.CreatedAt = time.Now()
	if p.ColSpan <= 0 {
		p.ColSpan = 1
	}
	if p.RowSpan <= 0 {
		p.RowSpan = 1
	}

	s.Projects = append([]models.Project{p}, s.Projects...)
	return p, s.saveUnlocked()
}

func (s *Store) DeleteProject(id string) (bool, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := -1
	for i, p := range s.Projects {
		if p.ID == id {
			idx = i
			break
		}
	}
	if idx == -1 {
		return false, nil
	}

	s.Projects = append(s.Projects[:idx], s.Projects[idx+1:]...)
	return true, s.saveUnlocked()
}

func (s *Store) AddInquiry(inq models.Inquiry) (models.Inquiry, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	inq.ID = fmt.Sprintf("inq-%d", time.Now().UnixNano())
	inq.CreatedAt = time.Now()
	s.Inquiries = append([]models.Inquiry{inq}, s.Inquiries...)
	return inq, s.saveUnlocked()
}

func (s *Store) GetInquiries() []models.Inquiry {
	s.mu.RLock()
	defer s.mu.RUnlock()
	copied := make([]models.Inquiry, len(s.Inquiries))
	copy(copied, s.Inquiries)
	return copied
}

func (s *Store) Authenticate(username, password string) (*models.User, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	for _, u := range s.Users {
		if u.Username == username && u.Password == password {
			userCopy := u
			return &userCopy, true
		}
	}
	return nil, false
}
