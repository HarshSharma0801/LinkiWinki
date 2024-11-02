package main

import (
	"Go-Server/api"
	"Go-Server/sqlc"
	"Go-Server/util"
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)



func main(){

	config , err := util.LoadConfig(".")
	if err != nil {
		log.Fatalf("could not able to initialize env : %v" , err)
	}

	conn , err := sql.Open(config.Driver , config.DbUrl)
	if err != nil {
		log.Fatalf("could not able to connect to database  : %v" , err)
	}

	store := sqlc.NewStore(conn)

	server , err := api.NewServer(store , config)
	if err != nil {
		log.Fatalf("could not able to initialize server  : %v" , err)
	}

	if err := server.Start(config.Port); err !=nil {
		log.Fatalf("could not able to start server  : %v" , err)
	}
	

}