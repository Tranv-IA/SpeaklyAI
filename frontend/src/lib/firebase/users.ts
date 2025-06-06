
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createUserInBackend(token: string, data: { nombre: string }) {
  const res = await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json().catch(() => null);

  if (!res.ok) {
    const message = responseData?.message || 'Error desconocido';
    console.error("Error desde backend:", message);
    throw new Error(message);
  }

  return responseData;
}

export async function getUserInBackend(token: string) {

  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener usuario en backend');
  }

  return await res.json();
}

export async function updateUserInBackend(token: string, data: { score: number }) {
  const res = await fetch(`${url}/usuario`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Error al actualizar usuario en backend');
  }

  return await res.json();
}

export async function getAllUsers(token: string) {
  const res = await fetch(`${url}/usuario`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener usuarios en backend');
  }

  return await res.json();
}