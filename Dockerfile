FROM python:3.12 as python
WORKDIR /app
RUN python -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"
COPY ./university-map/ .
RUN pip install -r scripts/requirements.txt && \
    PROJECT_ROOT=$(pwd) python scripts/build-index.py

FROM node:lts AS builder
WORKDIR /app
COPY ./university-map/ .
COPY --from=python /app/public/universities/locations.json ./public
RUN npm ci && \
    npm run build

FROM busybox:stable AS runtime
RUN adduser -D app
USER app
WORKDIR /home/app
COPY --from=builder /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]