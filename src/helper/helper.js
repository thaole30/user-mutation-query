
export const getAllUsers = async () => {
    const response = await fetch(`http://localhost:8080/users`);
    return response.json();
}


//CREATE User

export const createUser = async (userData) => {
    if (!userData) return Promise.reject("userData is not Provided...!");

    const data = await fetch(`http://localhost:8080/users`, {
        method : "POST",
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(userData)
        }
    );

    return data.json();

}


//DELETE user
export const deleteUser = async (userId) => {
    if(!userId) {
        return Promise.reject("userId is not Provided...!");
    }

    const data = await fetch(`http://localhost:8080/users/${userId}`, {
        method : 'DELETE',
    });

    return data;
}