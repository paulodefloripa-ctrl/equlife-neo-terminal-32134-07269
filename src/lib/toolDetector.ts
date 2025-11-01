const toolKeywords: Record<string, string[]> = {
  'Google Workspace': ['google', 'gmail', 'drive', 'calendar', 'workspace', 'gsuite'],
  'Microsoft 365': ['microsoft', 'office', 'outlook', 'teams', 'onedrive', '365', 'sharepoint'],
  'Slack': ['slack'],
  'HubSpot': ['hubspot', 'hub spot'],
  'Notion': ['notion'],
  'Trello': ['trello'],
  'Asana': ['asana'],
  'Jira': ['jira', 'atlassian'],
  'GitHub': ['github'],
  'GitLab': ['gitlab'],
  'Salesforce': ['salesforce', 'sales force'],
  'Zendesk': ['zendesk'],
  'Zapier': ['zapier'],
  'Airtable': ['airtable'],
  'Monday': ['monday.com', 'monday'],
  'ClickUp': ['clickup'],
  'Dropbox': ['dropbox'],
};

export const detectTools = (text: string): string[] => {
  if (!text || text.trim() === '') return [];
  
  const lowerText = text.toLowerCase();
  const detected: string[] = [];
  
  for (const [tool, keywords] of Object.entries(toolKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      detected.push(tool);
    }
  }
  
  return detected;
};
