🌿 AyuLink: Blockchain-Based Traceability for Ayurveda

A “farm-to-pharmacy” platform ensuring authenticity, quality, and trust in the Ayurvedic supply chain using Blockchain and AI.

📖 Overview

AyuLink addresses rising concerns about adulteration, quality inconsistency, and lack of transparency in the Ayurvedic supply chain.
Using Blockchain, each batch of herbs receives a tamper-proof digital passport documenting its entire journey—from cultivation to the final product.

An integrated AI model predicts a Quality Score based on environmental conditions such as soil pH, rainfall, and sunlight.

✨ Key Features

🔗 Immutable Ledger
EVM-compatible blockchain permanently stores batch origin & processing data.

🤖 AI Quality Score
Linear Regression model predicts herb quality (e.g., 8.7/10) from environmental inputs.

📱 QR Code Verification
Consumers scan a QR code to instantly verify authenticity and review the batch history.

🧬 Digital Twinning
Each harvest receives a unique, non-duplicable Batch ID.

🧑‍🌾 Role-Based Access

Farmers: register harvests

Supply Chain: update processing events

Consumers: verify authenticity

🛠 Tech Stack
Frontend

Framework: React (Vite)

Language: TypeScript

Styling: Tailwind CSS, shadcn/ui

Libraries: axios, qrcode

Backend (Node.js)

Runtime: Node.js

Framework: Express.js

Blockchain Interaction: Ethers.js

Utilities: nanoid, dotenv

Blockchain

Network: EVM-compatible
(tested on Hardhat, ready for Sepolia / Polygon)

Language: Solidity

Dev Environment: Hardhat

Machine Learning

Model: Linear Regression

Libraries: Scikit-learn, Pandas

API: Flask (Python) serving predictions to Node.js

⚙️ System Architecture

Registration
Farmer submits harvest data through the React UI.

AI Analysis
Node.js sends environmental data to Flask ML API → returns Quality Score.

Blockchain Commit
Backend calls createHerbBatch on the Smart Contract—data is stored immutably.

Tracking
Supply chain partners add events via addTraceEvent.

Verification
Consumers fetch complete history using getHerbHistory.

🚀 Getting Started
Prerequisites

Node.js

Python (for ML Service)

MetaMask or compatible wallet

1. Deploy Smart Contract
cd smart-contracts
npx hardhat node        # Start local blockchain
npx hardhat run scripts/deploy.js --network localhost
# Copy the deployed Contract Address and ABI for backend configuration

2. Backend Setup (Node.js)
cd backend
npm init -y
npm install express ethers nanoid dotenv
# Add Contract Address + Private Key to .env
node server.js

3. ML Service Setup (Python)
cd ml-service
pip install flask scikit-learn pandas
python app.py

4. Frontend Setup
cd frontend
npm install
npm install axios qrcode
npm run dev

📡 API Endpoints
Method	Endpoint	Description
POST	/api/herbs	Registers a new herb batch; triggers AI scoring + blockchain commit
PUT	/api/herbs/:id/update	Adds new traceability event (e.g., Shipping, Packaging)
GET	/api/herbs/:id	Retrieves full batch history & verification details
GET	/api/stats	Returns dashboard blockchain/network statistics
🔮 Future Roadmap

IoT Integration
Real-time monitoring of temperature & humidity during transit.

Advanced AI Models
Upgrade from Linear Regression → Neural Networks for more accurate quality predictions.

Offline Mode
Allow farmers to input data without internet; sync when online.
