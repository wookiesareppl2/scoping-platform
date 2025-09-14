# Security Cleanup Instructions

## 🚨 CRITICAL: Remove Exposed Credentials from Git History

The server/.env file contains real MongoDB credentials that were committed to git. Follow these steps immediately:

### Step 1: Remove .env from Git History
```bash
# WARNING: This rewrites git history - coordinate with team first
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch server/.env' --prune-empty --tag-name-filter cat -- --all

# Alternative using git-filter-repo (recommended if available)
git filter-repo --path server/.env --invert-paths

# Force push to update remote (DANGEROUS - coordinate with team)
git push origin --force --all
git push origin --force --tags
```

### Step 2: Rotate MongoDB Credentials
1. Log into MongoDB Atlas
2. Go to Database Access
3. Delete the current user: `wookie`
4. Create a new user with a strong password
5. Update the connection string in your production environment variables
6. Test the new connection

### Step 3: Update Environment Variables
```bash
# Production environment (update in your hosting platform)
MONGODB_URI=mongodb+srv://NEW_USER:NEW_PASSWORD@cluster0.xxxxx.mongodb.net/scoping-platform

# Local development - create new server/.env
cp server/.env.example server/.env
# Edit server/.env with new credentials
```

### Step 4: Verify Security
```bash
# Check that .env is properly ignored
git status
# Should not show server/.env as tracked

# Verify .gitignore contains
echo "server/.env" >> .gitignore
```

### Step 5: Team Communication
- [ ] Notify all team members about the credential rotation
- [ ] Ensure everyone updates their local .env files
- [ ] Update CI/CD environment variables
- [ ] Update production deployment environment variables

## 🔒 Security Best Practices Going Forward

1. **Never commit credentials** - Always use .env files and .gitignore
2. **Rotate credentials regularly** - Every 90 days minimum
3. **Use environment-specific credentials** - Different for dev/staging/prod
4. **Monitor access logs** - Check MongoDB Atlas access logs regularly
5. **Use least privilege** - Database users should have minimal required permissions

## 📋 Security Checklist

- [ ] Git history cleaned
- [ ] MongoDB credentials rotated
- [ ] Production environment updated
- [ ] Team notified
- [ ] CI/CD updated
- [ ] Local .env files updated
- [ ] Access logs reviewed
- [ ] Security monitoring enabled