# Onchain Event Registration System

A Next.js application for registering to virtual hackathons using Smart Wallet Profiles and processing payments on Base Sepolia.

## Features

- 🔗 Smart Wallet integration with Coinbase Wallet
- 📝 User data collection (name, email, address, wallet address)
- 💰 0.01 USDC registration fee on Base Sepolia
- ✅ Data validation API
- 🔒 Privacy policy compliance
- 📱 Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Blockchain**: Wagmi + Viem for Web3 integration
- **Styling**: Tailwind CSS + shadcn/ui components
- **Network**: Base Sepolia testnet
- **Payment**: USDC token transfers

## Quick Start

### Prerequisites

- Node.js 18.18 or later
- Base Sepolia USDC tokens for testing
- ngrok for HTTPS tunneling (local development)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd onchain-event-registration
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Local HTTPS Setup (Required for Smart Wallet Profiles)

1. Install ngrok globally:
\`\`\`bash
npm install -g ngrok
\`\`\`

2. In a separate terminal, expose your local server:
\`\`\`bash
ngrok http 3000
\`\`\`

3. Update the callback URL in your code with the ngrok HTTPS URL:
\`\`\`typescript
// Replace 'https://your-ngrok-url.ngrok-free.app' with your actual ngrok URL
const callbackUrl = 'https://your-ngrok-url.ngrok-free.app/api/data-validation'
\`\`\`

## Configuration

### Environment Variables

Create a `.env.local` file (optional for this demo):
\`\`\`env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
\`\`\`

### Smart Wallet Profiles Integration

The app uses Smart Wallet Profiles with the following configuration:
- **Network**: Base Sepolia (Chain ID: 84532)
- **USDC Contract**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **Recipient Address**: `0xd8da6bf26964af9d7eed9e03e53415d37aa96045`
- **Registration Fee**: 0.01 USDC

**Important**: Update the callback URL in `app/page.tsx`:
\`\`\`typescript
function getCallbackURL() {
  return "https://your-actual-ngrok-url.ngrok-free.app/api/data-validation"
}
\`\`\`

Replace `your-actual-ngrok-url` with your ngrok URL when testing locally.

## API Endpoints

### POST /api/data-validation

Validates user data according to the following rules:
- **Email**: Must be valid format, no @example.com domains
- **Name**: First and last names must be ≥ 2 characters each
- **Address**: Must include postal code ≥ 5 digits, no "XY" country code
- **Wallet**: Must be a valid Ethereum address

## Testing

### Getting Test USDC

1. Visit the [Base Sepolia Faucet](https://faucet.quicknode.com/base/sepolia)
2. Get Base Sepolia ETH for gas fees
3. Use a USDC faucet or DEX to get test USDC tokens

### Test Flow

1. Connect your Smart Wallet
2. Select data to share (name, email, address, wallet)
3. Click "Register for Hackathon"
4. Approve the 0.01 USDC transaction
5. View registration confirmation with collected data

## Deployment

### Vercel Deployment

1. Push your code to GitHub (ensure first commit is after June 17, 2025)
2. Connect your GitHub repo to Vercel
3. Deploy with default settings
4. Update the callback URL in your code to use the production domain

### Environment Setup

No additional environment variables are required for basic functionality.

## Project Structure

\`\`\`
├── app/
│   ├── api/data-validation/route.ts  # Data validation API
│   ├── privacy/page.tsx              # Privacy policy page
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Main registration page
│   ├── providers.tsx                 # Wagmi/React Query providers
│   └── globals.css                   # Global styles
├── components/ui/                    # shadcn/ui components
├── wagmi.ts                         # Wagmi configuration
└── README.md                        # This file
\`\`\`

## Smart Wallet Profiles Feedback

### What Worked Well
- **Streamlined UX**: Smart Wallet Profiles significantly simplified the user data collection process
- **Security**: Users maintain control over their data while sharing only what's necessary
- **Integration**: The callback-based validation system works smoothly with existing APIs

### Suggestions for Improvement
- **Custom Fields**: Add support for event-specific fields like T-shirt size, dietary restrictions
- **Batch Operations**: Allow collecting data and processing payments in a single transaction
- **Data Persistence**: Option to save user preferences for future events
- **Mobile Optimization**: Enhanced mobile wallet integration for better UX

### Use Case Fit
Smart Wallet Profiles is perfect for event registration systems where:
- User privacy is paramount
- Data collection needs to be transparent
- Payment processing is required
- Compliance with privacy regulations is necessary

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues:
- Create an issue in this repository
- Contact: support@hackathon-event.com

---

**Note**: This application is built for the Base Builder Quest 6 submission. Ensure your first commit is dated after June 17, 2025, and submit before 11 AM ET, June 20, 2025.
