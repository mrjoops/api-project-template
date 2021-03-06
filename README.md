# API project template

## Usage

1. Fork this repository
2. Write your API descriptions in OpenAPI v3 YAML format in a file named `openapi.yaml`
3. Place them in a folder named after your service, and under the `reference` folder
4. Delete `reference/.gitignore`

### Validate API descriptions

Run this command:

```
make check
```

### Combine API descriptions

Just run this command:

```
make
```

Paths are prefixed with the base name of the description file, so if you have a `GET /:id` operation in your `reference/user/openapi.yaml` description file, it will be transformed into a `GET /user/:id` operation.

### Upload combined API description

You can define `UPLOAD_URL` if you don't want to send your file to Bitbucket (otherwise you just have to define `BB_AUTH_STRING`), then run this command:

```
make upload
```

### Generate documentation

Documentation will be generated in the `doc` folder using this command:

```
make doc
```

### Publish documentation to Netlify

You must define `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` first, then run this command:

```
make publish
```

