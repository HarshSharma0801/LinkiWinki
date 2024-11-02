
-- name: CreateLink :one
INSERT INTO links (
    username ,
    original_url,
    shorten_url,
    shorten_id
) VALUES (
    $1 , $2 , $3 , $4
) RETURNING * ;

-- name: UpdateLink :one
UPDATE links 
SET original_url = $1 
WHERE shorten_id = $2
RETURNING * ;

-- name: ListLinks :many
SELECT * FROM links
WHERE username = $1
ORDER BY id;

-- name: GetLinkByShortId :one
SELECT * FROM links
WHERE shorten_id = $1
ORDER BY id;

-- name: UpdateLinkClickCounts :one
UPDATE links 
SET  click_counts = click_counts + 1
WHERE shorten_id = $1 
RETURNING * ;

-- name: UpdateLinkClickQRCounts :one
UPDATE links 
SET  qr_counts = qr_counts + 1
WHERE shorten_id = $1 
RETURNING * ;