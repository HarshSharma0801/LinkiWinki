package api

import (
	"Go-Server/sqlc"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateLinkReqParams struct {
	Username     string `json:"username,omitempty"`
	OriginalLink string `json:"original_url,omitempty"`
}

type CreateLinkResParams struct {
	Username     string `json:"username,omitempty"`
	OriginalLink string `json:"original_url,omitempty"`
	ShortenUrl   string `json:"shorten_url,omitempty"`
}

func (server *Server) CreateLink(c *gin.Context) {

	var req CreateLinkReqParams

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorResponse(err.Error()))
		return
	}

	shortenId := uuid.New().String()
	shortenUrl := server.config.Api_Url + fmt.Sprintf("/%v", shortenId)

	LinkData := sqlc.CreateLinkParams{
		Username:    req.Username,
		OriginalUrl: req.OriginalLink,
		ShortenUrl:  shortenUrl,
		ShortenID:   shortenId,
	}

	data, err := server.store.CreateLink(c, LinkData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err.Error()))
		return

	}

	response := CreateLinkResParams{
		Username:     data.Username,
		OriginalLink: data.OriginalUrl,
		ShortenUrl:   data.ShortenUrl,
	}

	c.JSON(http.StatusOK, response)

}

type UpdateLinkReqParams struct {
	ShortenID           string `json:"shorten_id,omitempty" ,binding:"required"`
	OriginalLink string `json:"original_url,omitempty"`
}

type UpdateLinkResParams struct {
	Username     string `json:"username,omitempty"`
	OriginalLink string `json:"original_url,omitempty"`
	ShortenUrl   string `json:"shorten_url,omitempty"`
}

func (server *Server) UpdateLink(c *gin.Context) {

	var req UpdateLinkReqParams
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorResponse(err.Error()))
		return
	}


	LinkData := sqlc.UpdateLinkParams{
		ShortenID:          req.ShortenID,
		OriginalUrl: req.OriginalLink,
	}

	data , err := server.store.UpdateLink(c ,LinkData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err.Error()))
		return

	}

	response := CreateLinkResParams{
		Username:     data.Username,
		OriginalLink: data.OriginalUrl,
		ShortenUrl:   data.ShortenUrl,
	}

	c.JSON(http.StatusOK, response)

}


type ListLinkReqParams struct {
	Username           string `form:"username,omitempty" ,binding:"required"`
}


func (server *Server) ListLinks(c *gin.Context) {

	var req ListLinkReqParams
	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorResponse(err.Error()))
		return
	}

	data , err := server.store.ListLinks(c ,req.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err.Error()))
		return

	}

	c.JSON(http.StatusOK, data)

}


type RedirectLinkReqParams struct {
	ShortenID           string `uri:"shorten_id,omitempty" ,binding:"required"`
}


func (server *Server) RedirectLink(c *gin.Context) {

	var req RedirectLinkReqParams
	if err := c.ShouldBindUri(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorResponse(err.Error()))
		return
	}

	data, err := server.store.GetLinkByShortId(c, req.ShortenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err.Error()))
		return
	}

	LinkData, err := server.store.UpdateLinkClickCounts(c, data.ShortenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err.Error()))
		return
	}

	c.Redirect(http.StatusFound, LinkData.OriginalUrl)
}



func (server *Server) RedirectQRLink(c *gin.Context) {

	var req RedirectLinkReqParams
	if err := c.ShouldBindUri(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorResponse(err.Error()))
		return
	}

	data, err := server.store.GetLinkByShortId(c, req.ShortenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err.Error()))
		return
	}

	LinkData, err := server.store.UpdateLinkClickQRCounts(c, data.ShortenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err.Error()))
		return
	}

	c.Redirect(http.StatusFound, LinkData.OriginalUrl)
}