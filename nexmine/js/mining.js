function generateReferralLink() {
    const username = localStorage.getItem('nexmine_username') || 'user';
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    const fullLink = `${baseUrl}/signup.html?ref=${username}`;
    
    const refInput = document.getElementById('ref-link');
    if (refInput) refInput.value = fullLink;
}
