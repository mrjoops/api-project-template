.DEFAULT_GOAL     = $(SCHEMA_FILE)
BITBUCKET_COMMIT ?= v0.0.0
BITBUCKET_TAG    ?= $(BITBUCKET_COMMIT)
PROJECT_VERSION  ?= $(subst v,,$(BITBUCKET_TAG))
SCHEMA_FILE      ?= schema-$(BITBUCKET_TAG).yaml

export PROJECT_VERSION

.PHONY: check
check: node_modules
	$(foreach spec,$(shell ls -d reference/*/openapi.yaml),npx spectral lint $(spec);)

.PHONY: clean
clean:
	rm -f reference/.gitignore $(SCHEMA_FILE)

.PHONY: distclean
distclean: clean
	rm -fr node_modules

node_modules:
ifeq ($(CI),true)
	npm ci
else
	npm install
endif

$(SCHEMA_FILE): node_modules
ifndef PROJECT_CONTACT
	$(error PROJECT_CONTACT is not set)
endif
ifndef PROJECT_DESCRIPTION
	$(error PROJECT_DESCRIPTION is not set)
endif
ifndef PROJECT_SERVER
	$(error PROJECT_SERVER is not set)
endif
ifndef PROJECT_TITLE
	$(error PROJECT_TITLE is not set)
endif
	node ./scripts/combine-schemas.js > $@

