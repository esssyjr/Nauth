# Nauth: Computer Vision-Based NFT Authentication System

Nauth is a Computer Vision-based authentication system that verifies the uniqueness and authenticity of NFTs before they are minted, preventing NFT forgery and intellectual property theft of digital creators.

## Project Documentation

### 1. Image Upload from Frontend
The frontend form allows users to upload the artwork. When the user submits the image, the artwork file (in formats like JPEG or PNG) is sent to the backend via a POST request, along with the metadata (title, artist name, license type, etc.).

### 2. Backend Receives Image and Metadata
When the image and metadata are submitted, the backend will handle the request. This involves:
- Saving the image file temporarily or directly processing it.
- Extracting metadata fields (like title, artist, and description) from the request.

### 3. Computer Vision (CV) Aspect in the Backend
#### Step 1: Convert Image to Grayscale
Once the image is received, it is first converted to grayscale to reduce the complexity of the data and make the next steps more efficient.

#### Step 2: Binarization (Convert to Binary Image)
After converting the image to grayscale, a thresholding technique is applied to convert it into a binary image (black and white). This helps simplify image comparison by turning pixels into either black (0) or white (1).

#### Step 3: Image Hashing
To optimize comparison, the binary image can be converted into a hash or stored as a flattened array of binary values. Hashing ensures quick lookups when comparing an image against existing records.

**How It Works:**
- Takes the path of the image and converts it to a grayscale image.
- Converts the grayscale image to a binary image for easier comparison.
- Takes the binary image, flattens it, and creates a hash.

### 4. Backend Verification Against Database
Once the CV aspect has processed the image, the backend compares the hashed value (or binary representation) against existing entries in the database to check for uniqueness.

**Steps:**
1. Check Hash Against Database:
   - Search the database for a matching hash. If a match is found, it means the artwork has been uploaded before, and verification fails (duplicate detected).
   - If no match is found, the image is unique and can proceed to the minting stage.

### 5. Minting NFT on Blockchain Using Smart Contracts
Once the artwork is verified as unique, the backend interacts with a Solana smart contract to mint the NFT. It passes the metadata (title, artist, etc.) and stores the blockchain transaction ID for provenance.

**Key Backend Steps:**
- Create Transaction:
   The backend prepares the transaction to mint the NFT by interacting with the Solana blockchain. This involves signing the transaction and passing the artwork metadata to the smart contract.
  
- Mint NFT:
   The smart contract mints the NFT, and the resulting transaction ID is stored in the database for future provenance tracking.

### 6. Returning Results to the User (Frontend)
Once the NFT is successfully minted, the backend returns the minting result to the frontend, including:
- Minting Status (Success/Failure).
- Transaction ID on the blockchain.
- Link to View NFT.

## Summary of Interactions
1. User Uploads Artwork (Frontend).
2. Backend Receives Image:
   - Converts to binary via CV (grayscale, binarization).
   - Hashes binary image for comparison.
3. Backend Verifies Uniqueness:
   - Compares image hash against database.
   - If unique, proceeds to mint NFT.
4. Minting on Blockchain (Solana):
   - Backend interacts with smart contract to mint the NFT.
   - Metadata and provenance are stored on-chain.
5. Results Sent Back to Frontend:
   - User receives minting confirmation and a link to the NFT.

## Project Website
[https://1732-nauth.netlify.app/](https://1732-nauth.netlify.app/)