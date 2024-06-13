document.addEventListener('DOMContentLoaded', () => {
    const backendUrl = 'http://silasmc.duckdns.org:8585';
    
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const loginForm = document.getElementById('login-form');
    const loginKey = document.getElementById('login-key');

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

    const handleLogin = async (e) => {
        e.preventDefault();
        const key = loginKey.value;

        const response = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key }),
        });
        const result = await response.json();
        
        if (response.status === 200) {
            if (result.message.includes('Dev-Mode aktiviert')) {
                document.body.style.backgroundColor = 'black';
                document.body.style.color = 'lime';
                document.body.style.fontFamily = 'monospace';
            } else {
                setContainerVisibility(loginContainer, false);
                setContainerVisibility(chatContainer, true);
            }
        } else {
            alert(result.message);
        }
    };

    loginForm.addEventListener('submit', handleLogin);

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
