
export const fetchPosts = async (page: number, limit: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    const data = await res.json();
    return data;
  };
  
  export const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return data;
  };
  