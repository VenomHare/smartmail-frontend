# 🌐 Draft Pilot AI — Pages Overview

> Explore the different routes that power the Draft Pilot AI experience! Here you'll find a quick reference to every important page in the app. Each page serves a key purpose, from onboarding new users to managing your account and accessing advanced features. Use this table to get a bird’s-eye view of the application's structure.

| No. | Page Name | Route | Description |
| --- | ---------- | ----------------- | -------------------------------------------- |
| 1 | **Home Page** | `/` | The landing page introducing Draft Pilot AI. |
| 2 | **Mail Page** | `/mail/:uuid` | View and interact with a specific mail. |
| 3 | **Sign In Page** | `/login` | Secure sign-in portal for users. |
| 4 | **Sign Up Page** | `/signup` | New user registration page. |
| 5 | **Google Callback** | `/auth/callback` | Handles Google authentication callbacks. |
| 6 | **Gmail Link Callback** | `/link/gmail` | Gmail account linking and authentication. |
| 7 | **Profile Page** | `/account` | Manage your personal account and settings. |
| 8 | **Terms & Conditions** | `/terms` | Review our terms and policies. |
| 9 | **Privacy Page** | `/privacy` | Learn how your data is protected. |
| 10 | **Pricing Page** | `/pricing` | View available plans and pricing details. |
| 11 | **Onboarding Page** | `/onboarding` | First-time setup and guidance for users. |
| 12 | **Drafts** | `/drafts` | Access your saved mail drafts. |

> _Easily navigate through Draft Pilot AI’s features using the table above. Whether you're new or a seasoned user, our streamlined pages ensure you get the most out of your intelligent mailing experience!_

---

## In Detail

### 1. Home Page
- It will have 2 main states  
  - New User  
  - Logged In User  
- In both, The page needs to pitchy and Easy. User shouldn't need to make to effort to get to actual tool  
- Their will be questions displayed on screen on either screens.

**Main Components**
1. Sidebar  
   - Sidebar must be applied to all pages.
   - Sidebar should contain Logo + Heading, Search for recent mails, List of Recent Mails, User Info (name, plan, avatar) with menu to drafts, profile, Upgrade, Logout,etc and a button to toggle sidebar  
   - Clicking on DraftPilot Logo  should take to home page  
   - Search should filter Recent Mails  
2. Login, SignUp (if not logged in) and Theme Switcher  
3. Questions and Generate Button  
   - The Questions should be displayed very apealing and easy to answer  
   - Very Apealing Generate Button  

---

### 2. Mail Page
- It will be the most used page. This is page must be designed fully for User Experience  
- When the user's generate request is accepted, the user is redirected to this page.  
- It will have 2 conditions  
  1. Mail is generating  
  2. Mail is already generated  
- It will be decided by the status request which will be sent first and it will be updated by polling to server.  
- Until first response it won't be confirmed that the mail is generated or not  

**Status Request will 3 Types of Responses**
1. Inqueue
```js
{
  uuid : "42fe6055-c111-4bb9-933f-b3c5ffd05f78"
  status: "inqueue"
}
```
This means the Mail Generation request in inqueue to get processed which can be avoided by getting priority by upgrading to some plan.

2. Processing Response
```js
{
    uuid : "42fe6055-c111-4bb9-933f-b3c5ffd05f78"
    status: "processing"
}
```
This means the Mail Generation request is being processed by worker which means the mail is being generated.
The Generation should have animations and cool loaders

3. Processed Response  
This response itself is 2 types  
  1. More Questions Response
```js
{
      uuid: "42fe6055-c111-4bb9-933f-b3c5ffd05f78",
      status: "processed",
      response: {
          type: "questions",
          llmMessage: "asdsadas",
          questions: [
              {
                  question: "what is xyz ",
                  select: true //for selection based questions
                  options: ["sdka", "sadasd", "sdad"]
                  textarea: true // false for normal input field (for other option)
              },
              {
                  question: "what is logo url ",
                  textarea: true // false for normal input field
              }
          ]
      }
}
```
- After this response the answers will be sent to server again and the same queue process will repeat.  
- These questions must displayed pretty and same as home page  
- llmMessage is basically something llm said  

2. Mail Response
```js
{
  uuid: "42fe6055-c111-4bb9-933f-b3c5ffd05f78",
  status: "processed",
  response: {
      type: "mail",
      llmMessage: "asdsadas",
      html: "<h1>Email Content</h1>"
      subject: "ABC inc"
  }
}
```
- This is the Final Response Message which includes mail  
- This page is the most important it should be responsive to mobile screens.  

**Main Components of this screen**
1. It should have dynamically resizable, mobile, tablet and desktop display for mail  
2. It should have a chat box to chat with ai  
3. It should options to perform operations with mail (basically export mail)  
4. Chat Box and Mail Preview will be the most important and used.

**Chat Box**
- Chat box will chats from ai and user  
- Chat box must be already open.
- It will be rate limited (3 chats to free users daily)  
- Chats will be inqueue as well  

**Actions**
- Copy to Clipboard (Only works on desktop pc): It copies the mail in Rich Text Format and then when user pastes it in compose box, the actual mail gets pasted  
- Draft to Gmail: Opens a Section/popup/drawer to send mail as draft to gmail account  

**Draft To Gmail**
-  It should have list of Linked Accounts showing thier mail id and a send draft button.  
- It should have Link New Account button which initaites Gmail account link process (by opening oauth link in new window)  

---

### 3. Login Page
- A Login Page with email and password or with Google (Oauth)  
- Link to sign up page and Forgot Password  

### 4. Signup Page
- A Signup Page with email and password or with Google (Oauth)  
- Link to login page  

### 5. Google OAuth Callback Page
- It should be loading page for server to process the code recieved from Google  
- Once done, user should redirect to Onboarding Page.  

### 6. Gmail Linking Page
- User will land on this page once he grants concent to google this page should have 3 stages  
  1. Loading  
  2. Success  
  3. Error  
- This page should show that Draft Pilot is linking to Gmail.  
- Basic Idea (can be changed) : Logo of DraftPilot, a plus sign and Gmail Logo.  
- Below That Logo Text will be changed based on state  

> [!CAUTION]
> Profile, Pricing, Terms and Privacy Page's content is tentative and basic idea won't change.

### 7. Profile Page
- Profile page will be profile page  
- Options to change settings  

### 8. Terms & Conditions
- A Page with Terms and Conditions  

### 9. Privacy Policy Page
- A Page with Privacy Policies  

### 10. Pricing Page
- Verticular Tabs aligned horizontally for available plans.  
- Names and Prices are TBD  
- Initally 3 Plans  
  1. Free Plan  
  2. Gold Plan  
  3. Platinum Plan  

#### 1. Free Plan
- Only 1 Mail generation daily  
- Only 3 Chat messages daily  
- Only 1 Gmail Account can be linked  

#### 2. Gold Plan
- Unlimited Mail generation  
- Only 20 Chat messages daily  
- Only 10 Gmail Accounts can be linked  

#### 3. Platinum Plan
- Unlimited Mail generation  
- Unlimited Chat Messages  
- Unlimited Gmail Accounts can be linked  

### 11. Onboarding Page
- Either way after sign up user lands on this page.  
- For now just Full name (probably avatars in future)  

### 12. Drafts Page
- This page will show all drafts sent to gmail every  
