document.addEventListener('DOMContentLoaded', () => {
    const backendUrl = 'http://silasmc.duckdns.org:8585';
    
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const chatContainer = document.getElementById('chat-container');
    const loginForm = document.getElementById('login-form');
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');

    const registerForm = document.getElementById('register-form');
    const registerKey = document.getElementById('register-key');

    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messages = document.getElementById('messages');

    const privateChatForm = document.getElementById('private-chat-form');
    const privateChatName = document.getElementById('private-chat-name');

    const voteAdminOutForm = document.getElementById('vote-admin-out-form');
    const adminIdInput = document.getElementById('admin-id');

    const reportBugForm = document.getElementById('report-bug-form');
    const bugDescriptionInput = document.getElementById('bug-description');

    const setContainerVisibility = (container, isVisible) => {
        container.style.display = isVisible ? 'block' : 'none';
    };

    const checkLogin = () => {
        const isLoggedIn = !!localStorage.getItem('username');
        setContainerVisibility(loginContainer, !isLoggedIn);
        setContainerVisibility(registerContainer, !isLoggedIn);
        setContainerVisibility(chatContainer, isLoggedIn);
    };

    checkLogin();

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = loginUsername.value;
        const password = loginPassword.value;

        const response = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        if (response.status === 200) {
            localStorage.setItem('username', username);
            checkLogin();
        } else {
            alert(result.message);
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const key = registerKey.value;

        const response = await fetch(`${backendUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key }),
        });
        const result = await response.json();
        if (response.status === 201) {
            alert('Registered successfully! Now login with your credentials.');
            registerKey.value = '';
        } else {
            alert(result.message);
        }
    });

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = messageInput.value;
        const response = await fetch(`${backendUrl}/send_message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });
        const result = await response.json();
        if (response.status === 201) {
            const messageElement = document.createElement('div');
            messageElement.textContent = content;
            messages.appendChild(messageElement);
            messageInput.value = '';
        } else {
            alert(result.message);
        }
    });

    privateChatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = privateChatName.value;
        const response = await fetch(`${backendUrl}/create_private_chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
        const result = await response.json();
        if (response.status === 201) {
            alert('Private chat created successfully!');
            privateChatName.value = '';
        } else {
            alert(result.message);
        }
    });

    voteAdminOutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const admin_id = adminIdInput.value;
        const response = await fetch(`${backendUrl}/vote_admin_out`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ admin_id }),
        });
        const result = await response.json();
        if (response.status === 200) {
            alert(result.message);
            adminIdInput.value = '';
        } else {
            alert(result.message);
        }
    });

    reportBugForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = bugDescriptionInput.value;
        const response = await fetch(`${backendUrl}/report_bug`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        });
        const result = await response.json();
        if (response.status === 201) {
            alert(result.message);
            bugDescriptionInput.value = '';
        } else {
            alert(result.message);
        }
    });
});
