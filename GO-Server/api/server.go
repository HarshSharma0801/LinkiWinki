package api

import (
	"Go-Server/sqlc"
	"Go-Server/util"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Server struct {
	router *gin.Engine
	store  *sqlc.Store
	config util.Config
}

func NewServer(store *sqlc.Store, config util.Config) (*Server, error) {

	server := &Server{store: store, config: config}
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.POST("/api/createUrl", server.CreateLink)
	router.POST("/api/updateUrl", server.UpdateLink)
	router.GET("/api/getUrls", server.ListLinks)
	router.GET("/api/getQR", server.GetQr)
	router.GET("/:shorten_id", server.RedirectLink)
	router.GET("/qr/:shorten_id", server.RedirectQRLink)

	server.router = router

	return server, nil
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

func errorResponse(err string) gin.H {
	return gin.H{"error": err}
}
