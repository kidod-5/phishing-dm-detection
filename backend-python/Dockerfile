# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Install dependencies and Miniconda
RUN apt-get update && \
    apt-get install -y curl bzip2 && \
    curl -fsSL https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -o miniconda.sh && \
    bash miniconda.sh -b -p /opt/conda && \
    rm miniconda.sh && \
    /opt/conda/bin/conda init bash && \
    ln -s /opt/conda/bin/conda /usr/local/bin/conda && \
    conda clean --all -f -y

# Set environment variables to ensure conda is always in PATH
ENV PATH="/opt/conda/bin:$PATH"

# Set the working directory
WORKDIR /app

# Copy your environment.yml file to the container
COPY environment.yml /app/

# Create the Conda environment based on environment.yml
RUN conda env create -f environment.yml

# Activate the Conda environment and ensure it's the default
RUN echo "conda activate myenv" >> ~/.bashrc

# Copy the rest of your application code
COPY . /app/

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the application using the Conda environment
CMD ["conda", "run", "-n", "myenv", "python", "main.py"]

