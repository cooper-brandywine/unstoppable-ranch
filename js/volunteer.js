(function () {
 const form = document.getElementById('ranchInterestForm');
 const error = document.getElementById('interestError');
 form.addEventListener('change', function () {error.hidden = !!form.querySelector('input[name="interest"]:checked');});
 form.addEventListener('submit', function (event) {
  event.preventDefault();
  const interests = Array.from(form.querySelectorAll('input[name="interest"]:checked')).map(function (el) {return el.value;});
  error.hidden = interests.length > 0;
  if (!interests.length) {form.querySelector('input[name="interest"]').focus(); return;}
  const value = function (id) {return document.getElementById(id).value.trim() || 'Not provided';};
  const body = [ 'Volunteer & Visit Request', 'Interests: ' + interests.join(' and '),
   'Name: ' + value('rName'), 'Email: ' + value('rEmail'), 'Phone: ' + value('rPhone'),
   'City / State: ' + value('rLocation'), 'Meet-and-greet invitations: ' + (document.getElementById('rInvites').checked ? 'Yes' : 'No'),
   'Availability: ' + value('rAvailability'), 'Volunteer interests / experience: ' + value('rExperience'),
   'Additional notes: ' + value('rNotes'), 'I understand that visits must be confirmed by The Ranch.' ].join('\n\n');
  window.location.href = 'mailto:debbie@theunstoppableranch.org?subject=' + encodeURIComponent('Ranch Interest: ' + interests.join(' & ')) + '&body=' + encodeURIComponent(body);
  document.getElementById('rStatus').textContent = 'Please send the message in your email app to complete your request. If no app opened, use the email address below. Your request has not been sent by this page.';
 });
})();
