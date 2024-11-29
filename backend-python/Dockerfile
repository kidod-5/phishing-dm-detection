FROM continuumio/miniconda3

WORKDIR /backend-python

# Copy environment.yml and create the conda environment
COPY environment.yml .

RUN conda env create -f environment.yml

# Update PATH to include the conda environment
ENV PATH="/opt/conda/envs/phishing-env/bin:$PATH"

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Use conda run to activate the environment and run the application
CMD ["conda", "run", "-n", "phishing-env", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]




