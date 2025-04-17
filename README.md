Blight C2 - Web Interface

Overview
This is a web-based Command and Control (C2) client for managing remote agents (referred to as slaves). It uses:

    Frontend: React.js — user interface for operators to send commands

    Backend: Flask — handles communication with agents and command dispatching

    Agents: Communicate with the Flask server and await command execution

Frontend (ReactJS)
Purpose:

    Allows operators to input and dispatch commands to selected agents.

    Displays command history, agent status, and logs (if implemented).

