.PHONY: check
check: node_modules
	$(foreach spec,$(shell ls -d reference/*/openapi.yaml),npx spectral lint $(spec);)

.PHONY: clean
clean:
	rm -f reference/.gitignore

.PHONY: distclean
distclean: clean
	rm -fr node_modules

node_modules:
ifeq ($(CI),true)
	npm ci
else
	npm install
endif

