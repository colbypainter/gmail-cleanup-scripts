function cleanupInbox() {

 // Store the name of the label you want to save from archiving as a string value
 var keep = "Keep";

 // Get everything in the Inbox
 var threads = GmailApp.getInboxThreads();

 // Set the age of thread to zero
 var threadAge = 0;

 // Set max age for unkept threads
 var maxAge = 7;

 // Set today's date to use for comparison
 var today = new Date();
 // Convert to milliseconds
 today = today.getTime();

 // Initialize a counter for how many emails get archived
 var archivedNum = 0;

 // Iterate through every thread in the inbox
 for (var i = 0; i < threads.length; i++) {

   // Find the date of the most recent message and convert to ms
   var lastMessage = threads[i].getLastMessageDate();
   lastMessage = lastMessage.getTime();
   // Calculate how many days since last message
   threadAge = (today - lastMessage)/1000/60/60/24;
   threadAge = Math.floor(threadAge);

   // Get array of labels for each thread
   var threadLabels = threads[i].getLabels();

   // Use this variable to store whether a thread has a keep label
   var keepIndicator = 0;

   // Iterate through the label array to find the keep label
   for (var j = 0; j < threadLabels.length; j++) {
     if (threadLabels[j].getName() == keep) {
       keepIndicator = 1;
     };
   }

   if (keepIndicator == 0 && threadAge > maxAge) {
     Logger.log("This email will be deleted because it is " + threadAge + " days old.");
     GmailApp.moveThreadToArchive(threads[i]);
     archivedNum = archivedNum + 1;
   } else {
     Logger.log("This email will be kept");
   }

 }

 // Send an email to myself with details and confirmation.
 var now = new Date();
 GmailApp.sendEmail("[ENTER EMAIL HERE]", "GmailCleanup Has Completed", "Today you archived: " + archivedNum + " emails.");

}
