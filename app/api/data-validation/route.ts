import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()

    // Extract data from request
    const email = requestData.requestedInfo?.email
    const physicalAddress = requestData.requestedInfo?.physicalAddress

    const errors: any = {}

    // Validate email - reject example.com domains
    if (email && email.endsWith("@example.com")) {
      errors.email = "Example.com emails are not allowed"
    }

    // Validate physical address
    if (physicalAddress) {
      if (physicalAddress.postalCode && physicalAddress.postalCode.length < 5) {
        if (!errors.physicalAddress) errors.physicalAddress = {}
        errors.physicalAddress.postalCode = "Invalid postal code"
      }

      if (physicalAddress.countryCode === "XY") {
        if (!errors.physicalAddress) errors.physicalAddress = {}
        errors.physicalAddress.countryCode = "We don't ship to this country"
      }
    }

    // Return errors if any found
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({
        errors,
      })
    }

    // Success - no validation errors - return the original calls
    return NextResponse.json({
      request: {
        calls: requestData.calls,
        chainId: requestData.chainId,
        version: requestData.version,
      },
    })
  } catch (error) {
    console.error("Error processing data:", error)
    return NextResponse.json({
      errors: { server: "Server error validating data" },
    })
  }
}
