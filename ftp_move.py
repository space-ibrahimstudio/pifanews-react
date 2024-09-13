from ftplib import FTP
import os

# FTP server credentials
ftp_host = os.getenv("FTP_HOST")
ftp_user = os.getenv("FTP_USERNAME")
ftp_pass = os.getenv("FTP_PASSWORD")

# Connect to FTP
ftp = FTP(ftp_host)
ftp.login(ftp_user, ftp_pass)


def download_ftp_dir(ftp, dir_name, local_dir):
    """Recursively download a directory from the FTP server."""
    os.makedirs(local_dir, exist_ok=True)
    ftp.cwd(dir_name)

    # Get the list of files and directories
    file_list = ftp.nlst()

    for file in file_list:
        local_file = os.path.join(local_dir, file)

        # Skip the current directory ('.') and parent directory ('..')
        if file in [".", ".."]:
            continue

        # Check if it's a directory or a file
        if is_ftp_dir(ftp, file):
            download_ftp_dir(ftp, file, local_file)  # Recursive call for directories
        else:
            print(f"Downloading file: {file}")
            with open(local_file, "wb") as f:
                ftp.retrbinary(f"RETR {file}", f.write)

    ftp.cwd("..")  # Move back up after downloading the directory


def is_ftp_dir(ftp, file_name):
    """Check if the given name is a directory on the FTP server."""
    current = ftp.pwd()
    try:
        ftp.cwd(file_name)  # Try to change directory
        ftp.cwd(current)  # Change back to the original directory
        return True
    except Exception as e:
        return False


# Start downloading from the 'berita_temp' directory to '/tmp'
download_ftp_dir(ftp, "berita_temp", "/tmp")

# After downloading, upload the files to the destination directory 'berita'
ftp.cwd("berita")
for root, dirs, files in os.walk("/tmp"):
    for file in files:
        local_path = os.path.join(root, file)
        remote_path = os.path.relpath(local_path, "/tmp")
        print(f"Uploading file: {file}")
        with open(local_path, "rb") as f:
            ftp.storbinary(f"STOR {remote_path}", f)

ftp.quit()
