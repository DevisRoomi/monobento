package models

import "time"

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"-"`
	Name     string `json:"name"`
	Role     string `json:"role"`
}

type Project struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Tagline   string    `json:"tagline"`
	Category  string    `json:"category"`
	TechStack []string  `json:"tech_stack"`
	GithubURL string    `json:"github_url,omitempty"`
	LiveURL   string    `json:"live_url,omitempty"`
	Metrics   string    `json:"metrics"`
	Featured  bool      `json:"featured"`
	ColSpan   int       `json:"col_span"` // 1 or 2
	RowSpan   int       `json:"row_span"` // 1 or 2
	CreatedAt time.Time `json:"created_at"`
}

type Profile struct {
	Name         string            `json:"name"`
	Handle       string            `json:"handle"`
	Role         string            `json:"role"`
	Bio          string            `json:"bio"`
	Location     string            `json:"location"`
	Timezone     string            `json:"timezone"`
	Availability string            `json:"availability"`
	AvatarURL    string            `json:"avatar_url"`
	Socials      map[string]string `json:"socials"`
	Stats        map[string]any    `json:"stats"`
}

type Inquiry struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type HealthResponse struct {
	Status     string `json:"status"`
	Uptime     string `json:"uptime"`
	GoVersion  string `json:"go_version"`
	Goroutines int    `json:"goroutines"`
	MemoryAlloc string `json:"memory_alloc"`
	Framework  string `json:"framework"`
}
