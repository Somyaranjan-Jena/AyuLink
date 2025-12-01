# 🌿 **✨ AYULINK: BLOCKCHAIN-BASED TRACEABILITY FOR AYURVEDA ✨**  
*A “farm-to-pharmacy” authenticity and traceability platform powered by **Blockchain** + **AI***  

---

## 📖 **🚀 OVERVIEW**

**AyuLink** tackles the issues of **adulteration**, **quality inconsistency**, and **lack of transparency** in the Ayurvedic supply chain.  
Using **Blockchain**, every herb batch receives a **tamper-proof digital passport**, while an integrated **AI model** predicts its **Quality Score** using environmental parameters.

---

## ✨ **⭐ KEY FEATURES**

### 🔗 **Immutable Blockchain Ledger**  
Stores all herb lifecycle events on an **EVM-compatible** blockchain.

### 🤖 **AI-Powered Quality Prediction**  
Linear Regression model predicts a **Quality Score (e.g., 8.7/10)** from pH, rainfall, sunlight, etc.

### 📱 **Instant QR Code Verification**  
Consumers scan to verify **authenticity** and view the **entire batch history**.

### 🧬 **Digital Twinning**  
Each harvest receives a **unique, non-duplicable Batch ID**.

### 🧑‍🌾 **Role-Based Interfaces**  
- **Farmers:** Register harvests  
- **Supply Chain:** Update processing stages  
- **Consumers:** Verify authenticity  

---

## 🛠 **🧰 TECH STACK**

### **Frontend**
- ⚡ **React (Vite)**
- 🟦 **TypeScript**
- 🎨 **Tailwind CSS**, **shadcn/ui**
- 📦 Libraries: `axios`, `qrcode`

### **Backend**
- 🟩 **Node.js**
- 🚏 **Express.js**
- 🔗 **Ethers.js** (Blockchain interaction)
- 🔑 `nanoid`, `dotenv`

### **Blockchain**
- 🌐 **EVM-compatible** networks (Hardhat, Sepolia, Polygon)
- 🔐 **Solidity**
- 🧪 **Hardhat** development

### **Machine Learning**
- 📈 **Linear Regression**
- 📦 **Pandas**, **Scikit-learn**
- 🔥 **Flask API** serving predictions

---

## ⚙️ **🏗 SYSTEM ARCHITECTURE (Workflow Summary)**

1. **🌱 Harvest Registration** → Farmer submits batch data.  
2. **🤖 AI Analysis** → Flask ML API returns quality score.  
3. **⛓ Blockchain Commit** → `createHerbBatch` records everything immutably.  
4. **📦 Event Tracking** → Supply chain adds processing events.  
5. **🔍 Consumer Verification** → `getHerbHistory` returns complete lineage.

---

## 🚀 **🛠 GETTING STARTED**

### **Prerequisites**
✔ Node.js  
✔ Python  
✔ MetaMask or Web3 wallet  

---

### **1️⃣ Smart Contract Deployment**

```bash
cd smart-contracts
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
# Copy the Contract Address and ABI
```

---

### **2️⃣ Backend Setup**

```bash
cd backend
npm init -y
npm install express ethers nanoid dotenv
# Add Contract Address & Private Key to .env
node server.js
```

---

### **3️⃣ Machine Learning Service Setup**

```bash
cd ml-service
pip install flask scikit-learn pandas
python app.py
```

---

### **4️⃣ Frontend Setup**

```bash
cd frontend
npm install
npm install axios qrcode
npm run dev
```

---

## 📡 **📘 API ENDPOINTS**

| **Method** | **Endpoint**              | **Description** |
|-----------|----------------------------|-----------------|
| **POST**  | `/api/herbs`               | Register new batch + AI + blockchain commit |
| **PUT**   | `/api/herbs/:id/update`    | Add traceability event |
| **GET**   | `/api/herbs/:id`           | Retrieve batch history |
| **GET**   | `/api/stats`               | Network/blockchain stats |

---

## 🔮 **🌱 FUTURE ROADMAP**

### 📡 **IoT Integration**  
Real-time temp/humidity monitoring during logistics.

### 🧠 **Advanced AI Models**  
Shift from Linear Regression → **Neural Networks**.

### 🔌 **Offline Mode for Farmers**  
Allow offline data entry with later synchronization.

---

If you'd like, I can also add:  
🎨 A project logo/banner  
📊 Architecture diagram (Mermaid)  
📁 Project folder structure  
🏷 GitHub shields/badges  
