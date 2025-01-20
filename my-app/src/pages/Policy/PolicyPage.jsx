import React, { useEffect, useState } from 'react';

   const PolicyPage = () => {
       const [policyText, setPolicyText] = useState('');

       useEffect(() => {
           fetch('/policy.txt')
               .then(response => {
                   if (!response.ok) {
                       throw new Error('Network response was not ok');
                   }
                   return response.text();
               })
               .then(text => setPolicyText(text))
               .catch(error => console.error('Error fetching the policy:', error));
       }, []);

       return (
           <div>
               <h1>Политика конфиденциальности</h1>
               <pre>{policyText}</pre>
           </div>
       );
   };

   export default PolicyPage;