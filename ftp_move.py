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
    os.makedirs(local_dir, exist_ok=True)
    ftp.cwd(dir_name)
    file_list = ftp.nlst()

    for file in file_list:
        local_file = os.path.join(local_dir, file)
        if is_ftp_dir(ftp, file):
            download_ftp_dir(ftp, file, local_file)
        else:
            with open(local_file, "wb") as f:
                ftp.retrbinary(f"RETR {file}", f.write)

    ftp.cwd("..")


def is_ftp_dir(ftp, file_name):
    try:
        ftp.cwd(file_name)
        ftp.cwd("..")
        return True
    except:
        return False


# Set source and destination directories
download_ftp_dir(ftp, "berita_temp", "/tmp")

# Now, upload from /tmp to the destination directory
ftp.cwd("berita")
for root, dirs, files in os.walk("/tmp"):
    for file in files:
        local_path = os.path.join(root, file)
        remote_path = os.path.relpath(local_path, "/tmp")
        with open(local_path, "rb") as f:
            ftp.storbinary(f"STOR {remote_path}", f)

ftp.quit()
