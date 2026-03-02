import subprocess
import os

try:
    with open("check_git.txt", "w") as f:
        f.write("Starting check...\n")
        try:
            res = subprocess.run(["git", "--version"], capture_output=True, text=True, check=True)
            f.write(f"Git version: {res.stdout}\n")
        except Exception as e:
            f.write(f"Git command failed: {str(e)}\n")
        
        f.write(f"Current dir: {os.getcwd()}\n")
        f.write(f"Files in dir: {os.listdir('.')}\n")
except Exception as e:
    with open("check_git_error.txt", "w") as f:
        f.write(str(e))
