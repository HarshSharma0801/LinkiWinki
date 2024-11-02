package api

import (
	"Go-Server/sqlc"
	"Go-Server/util"

	"github.com/gin-gonic/gin"
)


type Server struct {
	router *gin.Engine
	store *sqlc.Store
	config util.Config
}


func NewServer(store *sqlc.Store , config util.Config) (*Server , error) {

	server := &Server{store: store , config:config}
	router := gin.Default()

	router.POST("/link" , server.CreateLink)
	router.POST("/update/link" , server.UpdateLink)
	router.GET("/link" , server.ListLinks)
	router.GET("/:shorten_id" , server.RedirectLink)
	router.GET("/qr/:shorten_id" , server.RedirectQRLink)


	server.router = router


	return server , nil
}


func (server *Server) Start(address string) error {
	return server.router.Run(address)
}


func errorResponse(err string) gin.H {
	return gin.H{"error" : err}
}