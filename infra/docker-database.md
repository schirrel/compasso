docker compose exec postgres psql -U postgres -c "CREATE DATABASE identidade;"
docker compose exec postgres psql -U postgres -c "CREATE DATABASE catalogo;"
docker compose exec postgres psql -U postgres -d catalogo -c "select * from catalogo_studio;"
docker compose exec postgres psql -U postgres -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';"

SELECT datname FROM pg_database WHERE datname <> ALL ('{template0,template1,postgres}')

SELECT datname FROM pg_database WHERE datname <> ALL ('{template0,template1,postgres}')
SELECT * FROM pg_catalog.pg_tables WHERE schemaname='public';