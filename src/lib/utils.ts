import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollbar_css = `
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-accent-foreground
    [&::-webkit-scrollbar-thumb]:bg-accent
    dark:[&::-webkit-scrollbar-track]:bg-accent-foreground
    dark:[&::-webkit-scrollbar-thumb]:bg-accent
`;

export const scrollbar_hidden_css = `
    [&::-webkit-scrollbar]:w-0
    [&::-webkit-scrollbar-track]:bg-accent-foreground
    [&::-webkit-scrollbar-thumb]:bg-accent
    dark:[&::-webkit-scrollbar-track]:bg-accent-foreground
    dark:[&::-webkit-scrollbar-thumb]:bg-accent
`;

export const DummyMail = ` 
  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"background-color:#F9FAFB; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\">\n  <tr>\n    <td align=\"center\" style=\"padding: 20px 0;\">\n      <table width=\"600\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0, 0, 0, 0.08);\">\n        <tr>\n          <td align=\"center\" style=\"padding: 0;\">\n            <!-- Gradient Header -->\n            <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"background: linear-gradient(to right, #1A2980, #26D0CE); padding: 40px 30px; border-bottom: 3px solid rgba(0, 0, 0, 0.1);\">\n              <tr>\n                <td align=\"center\" style=\"font-size: 32px; font-weight: 700; color: #FFFFFF; line-height: 1.2;\">\n                  We've Got Something Special for You\n                </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style=\"padding: 40px 30px 20px 30px; color:#2C3E50;\">\n            <p style=\"font-size: 18px; line-height: 1.6; margin-bottom: 25px; color:#2C3E50; font-weight: 600;\">\n              Dear Valued Business Partner,\n            </p>\n            <p style=\"font-size: 16px; line-height: 1.7; margin-bottom: 25px; color:#7F8C8D;\">\n              Prepare for an exciting update! Venomhare Inc. is thrilled to invite you to an exclusive event where we'll unveil our latest announcements and breakthrough improvements. This is your prime opportunity to gain a competitive edge, discover new collaborative possibilities, and witness firsthand how we're evolving to serve you better.\n            </p>\n            <p style=\"font-size: 16px; line-height: 1.7; margin-bottom: 30px; color:#7F8C8D;\">\n              Don't miss out on insights that will empower our shared success!\n            </p>\n          </td>\n        </tr>\n        <tr>\n          <td align=\"center\" style=\"padding: 10px 30px 40px 30px;\">\n            <!-- Call to Action Button -->\n            <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n              <tr>\n                <td align=\"center\" style=\"border-radius: 8px; background-color: #1ABC9C;\">\n                  <a href=\"#\" target=\"_blank\" style=\"font-size: 18px; font-weight: bold; color: #FFFFFF; text-decoration: none; padding: 15px 30px; border-radius: 8px; display: inline-block; background-color: #1ABC9C; transition: background-color 0.3s ease;\"\n                  onmouseover=\"this.style.backgroundColor='#16A085'\" onmouseout=\"this.style.backgroundColor='#1ABC9C'\">\n                    View Details\n                  </a>\n                </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style=\"padding: 20px 30px 40px 30px; border-top: 1px solid #E0E0E0; text-align: center; color:#7F8C8D;\">\n            <p style=\"font-size: 14px; line-height: 1.5; margin-bottom: 10px;\">\n              Sincerely,\n            </p>\n            <p style=\"font-size: 16px; font-weight: 600; color:#2C3E50; margin-bottom: 5px;\">\n              The Communications Team\n            </p>\n            <p style=\"font-size: 14px; color:#7F8C8D; margin: 0;\">\n              Venomhare Inc.\n            </p>\n          </td>\n        </tr>\n      </table>\n    </td>\n  </tr>\n  <tr>\n    <td align=\"center\" style=\"padding: 30px 20px; font-size: 12px; color: #95A5A6; line-height: 1.6;\">\n      <p style=\"margin: 0;\">\n        You are receiving this email because you are a valued business partner of Venomhare Inc.\n      </p>\n      <p style=\"margin: 10px 0 0 0;\">\n        <a href=\"#\" target=\"_blank\" style=\"color: #95A5A6; text-decoration: underline;\">Unsubscribe</a> | <a href=\"#\" target=\"_blank\" style=\"color: #95A5A6; text-decoration: underline;\">Contact Us</a>\n      </p>\n      <p style=\"margin: 10px 0 0 0;\">\n        &copy; 2024 Venomhare Inc. All rights reserved.\n      </p>\n    </td>\n  </tr>\n</table>
  `

// export const DummyMail = `<!-- Professional HTML email code starts -->
// <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%); padding: 20px 0; color: #F0F0F0; line-height: 1.6;">
//   <table width="100%" border="0" cellspacing="0" cellpadding="0">
//     <tr>
//       <td align="center" style="padding: 0 10px;">
//         <table class="email-container" width="100%" style="max-width: 600px; background-color: #2A2A2A; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); border-spacing: 0; border-collapse: collapse; margin-bottom: 20px;" border="0" cellspacing="0" cellpadding="0">
//           <!-- Logo Section -->
//           <tr>
//             <td align="center" style="padding: 20px 20px 10px;">
//               <a href="https://lgimodz.vercel.app/" target="_blank" style="text-decoration: none;">
//                 <img src="https://lgimodz.vercel.app/lgimodz.png" alt="LGI Modz Logo" width="150" style="display: block; border: 0; max-width: 150px; height: auto;">
//               </a>
//             </td>
//           </tr>
//           <!-- Banner Image Section -->
//           <tr>
//             <td align="center" style="padding: 10px 0;">
//               <img src="https://lgimodz.vercel.app/poster/limited.webp" alt="WWE HCTP Limited Edition Patch Banner" width="600" style="display: block; border: 0; max-width: 100%; height: auto; border-radius: 8px;">
//             </td>
//           </tr>
//           <!-- Main Content Section -->
//           <tr>
//             <td style="padding: 30px 40px; text-align: center; color: #F0F0F0;">
//               <h1 style="font-size: 28px; color: #FF4040; margin-bottom: 15px; font-weight: bold;">Your Exclusive WWE HCTP Patch Awaits!</h1>
//               <p style="font-size: 16px; margin-bottom: 25px; color: #BBBBBB;">Thank you for your interest in the **WWE HCTP Limited Edition Patch**! You're just one step away from an unparalleled gaming experience. To complete your purchase via UPI, please find the payment details below.</p>

//               <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
//                 <tr>
//                   <td align="center" style="background-color: #1A1A1A; border-radius: 8px; padding: 25px; box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);">
//                     <h2 style="font-size: 22px; color: #E02020; margin-bottom: 15px; font-weight: bold;">Payment Details (UPI)</h2>
//                     <p style="font-size: 18px; color: #F0F0F0; margin-bottom: 15px;">
//                       Patch Price: <strong style="color: #FF4040;">1800 INR</strong>
//                       <br>
//                       <span style="font-size: 14px; color: #BBBBBB;">(For international customers, the price is 24.99 USD via PayPal/other methods)</span>
//                     </p>
//                     <p style="font-size: 18px; color: #F0F0F0; margin-bottom: 10px;">
//                       Your UPI ID: <strong style="color: #FF4040;">lucy07@apl</strong>
//                     </p>
//                     <p style="font-size: 16px; color: #BBBBBB; margin-bottom: 20px;">Scan the QR code below to make your payment:</p>
//                     <img src="https://lgimodz.vercel.app/lucy_upi.png" alt="UPI QR Code for Payment" width="200" style="display: block; border: 0; max-width: 100%; height: auto; margin: 0 auto 20px;">
//                     <p style="font-size: 16px; color: #BBBBBB;">Please ensure you pay the exact amount of **1800 INR**.</p>
//                   </td>
//                 </tr>
//               </table>

//               <h3 style="font-size: 20px; color: #FF4040; margin-bottom: 10px; font-weight: bold;">Delivery Information:</h3>
//               <p style="font-size: 16px; color: #BBBBBB; margin-bottom: 25px;">
//                 Once your payment is successfully verified, your WWE HCTP Limited Edition Patch will be manually delivered via Google Drive to your registered email address within **2-3 business days**. We take pride in ensuring every patch is delivered with care and precision!
//               </p>

//               <!-- Call to Action Button -->
//               <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 30px;">
//                 <tr>
//                   <td align="center" style="border-radius: 8px; background-color: #E02020; box-shadow: 0 4px 10px rgba(224, 32, 32, 0.4);">
//                     <a href="https://lgimodz.vercel.app/limited" target="_blank" style="font-size: 18px; font-weight: bold; color: #FFFFFF; text-decoration: none; padding: 15px 30px; display: inline-block; border-radius: 8px;">
//                       Learn More About The Patch
//                     </a>
//                   </td>
//                 </tr>
//               </table>

//               <p style="font-size: 16px; color: #BBBBBB; margin-top: 20px;">
//                 Thank you for choosing LGI Modz for your ultimate WWE HCTP experience. Get ready for unmatched gameplay!
//               </p>
//               <p style="font-size: 14px; color: #BBBBBB; margin-top: 30px;">
//                 If you have any questions, feel free to contact us.
//               </p>
//             </td>
//           </tr>
//           <!-- Footer Section -->
//           <tr>
//             <td align="center" style="padding: 25px 40px; font-size: 12px; color: #BBBBBB; background-color: #1A1A1A; border-top: 1px solid #333333;">
//               <p style="margin: 0 0 10px;">
//                 &copy; 2023 LGI Modz. All rights reserved.
//               </p>
//               <p style="margin: 0;">
//                 <a href="https://lgimodz.vercel.app/privacy-policies" target="_blank" style="color: #FF4040; text-decoration: none;">Privacy Policy</a>
//                 &nbsp;|&nbsp;
//                 <a href="mailto:lgimodsofficial@gmail.com" style="color: #FF4040; text-decoration: none;">Contact Us</a>
//                 &nbsp;|&nbsp;
//                 <a href="#" target="_blank" style="color: #FF4040; text-decoration: none;">Unsubscribe</a>
//               </p>
//             </td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//   </table>
// </div>
// <!-- Professional HTML email code ends -->`