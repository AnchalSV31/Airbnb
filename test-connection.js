// test-connection.js
const mongoose = require('mongoose');

// Replace with your actual connection string
const MONGO_URL = "mongodb+srv://anchal31:anchal2005@cluster0.v4iqd72.mongodb.net/test?retryWrites=true&w=majority";

async function testConnection() {
    try {
        console.log('🔄 Attempting to connect to MongoDB...');
        
        await mongoose.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        
        console.log('✅ Successfully connected to MongoDB!');
        console.log('📊 Connection state:', mongoose.connection.readyState);
        console.log('🏷️  Database name:', mongoose.connection.name);
        
        // Test a simple operation
        const admin = mongoose.connection.db.admin();
        const result = await admin.ping();
        console.log('🏓 Ping result:', result);
        
        await mongoose.disconnect();
        console.log('✅ Disconnected successfully');
        
    } catch (error) {
        console.log('❌ Connection failed!');
        console.log('Error code:', error.code);
        console.log('Error message:', error.message);
        
        if (error.code === 8000) {
            console.log('\n🔧 This is an authentication error. Please:');
            console.log('   1. Check your username and password');
            console.log('   2. Make sure your IP is whitelisted');
            console.log('   3. Verify user permissions in Database Access');
        }
    }
}

testConnection();