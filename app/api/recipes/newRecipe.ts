// pages/api/recipes.ts

import { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.REACT_APP_FIREBASE_DATABASE;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const response = await fetch(apiKey + 'user.json');
      if (!response.ok) {
        throw new Error('Fetching data failed');
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else if (req.method === 'PUT') {
    try {
      const response = await fetch(apiKey + 'user.json', {
        method: 'PUT',
        body: JSON.stringify(req.body), // Assuming the client sends data in the request body
      });
      if (!response.ok) {
        throw new Error('Error sending data');
      }
      res.status(200).json({ message: 'Data sent successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to send data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

// Your React component

async function fetchData() {
  try {
    const response = await fetch('/api/recipes');
    if (!response.ok) {
      throw new Error('Fetching data failed');
    }
    const data = await response.json();
    // Process the data as needed
  } catch (error) {
    console.log(error);
  }
}

async function sendUserData(userData: any) {
  try {
    const response = await fetch('/api/recipes', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error sending data');
    }
    // Handle the response as needed
  } catch (error) {
    console.log(error);
  }
}
