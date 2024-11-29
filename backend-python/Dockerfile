FROM continuumio/miniconda3

WORKDIR /backend-python

COPY environment.yml .

RUN conda env create -f environment.yml

ENV PATH /opt/conda/envs/standard_env/bin:$PATH

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]


