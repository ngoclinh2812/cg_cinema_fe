import axios from "axios";

const BASE_URL = "http://localhost:8080/api/sf/account";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, userData);
        console.log(userData)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        console.log(response.data);
        localStorage.setItem('token', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        // Handle error
        return null;
    }
};

export const getUserProfile = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get(`${BASE_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error);
        // Handle error
        return null;
    }
};


/*export const checkDuplicatePhone = async (phone) => {
    try {
        const response = await axios.get(`${BASE_URL}/check-duplicate-phone?phone=${phone}`);
        return response.data.isDuplicate;
    } catch (error) {
        console.error(error);
        // Handle error
        throw new Error(error.response.data);
    }
};

export const checkDuplicateUsername = async (username) => {
    try {
        const response = await axios.get(`${BASE_URL}/check-duplicate-username?username=${username}`);
        return response.data.isDuplicate;
    } catch (error) {
        console.error(error);
        // Handle error
        throw new Error(error.response.data);
    }
};

export const checkDuplicateEmail = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/check-duplicate-email?email=${email}`);
        return response.data.isDuplicate;
    } catch (error) {
        console.error(error);
        // Handle error
        throw new Error(error.response.data);
    }

};*/