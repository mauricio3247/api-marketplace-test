export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    db_mongo_connection: process.env.DB_MONGO_CONECTION,
});