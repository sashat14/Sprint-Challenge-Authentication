<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
    - Sessions allow for data to persist accross request.
        That data is then sent to the client in the form of a cookie.


2. What does bcrypt do to help us store passwords in a secure manner.
    - bcrypt salts and hashes passwords as many times as the developer specifies.  The
        hashed version is stored in the database not the plain text.

3. What does bcrypt do to slow down attackers?
    - bcrypt salts and hashes passwords. It also adds time to each password attempt.  Therefore everytime an invalid password is entered the next attempt takes longer to validate, slowing down any unhashing algorithms attackers maybe trying to use.    


4. What are the three parts of the JSON Web Token?
    - The header, payload, and signature.
