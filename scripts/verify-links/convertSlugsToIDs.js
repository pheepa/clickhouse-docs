const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'id_slug_mapping.json');
const mapping = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

let stringsArray = [
    "en/data-compression/compression-modes",
"en/deployment-guides/horizontal-scaling",
"en/deployment-guides/replicated",
"en/deployment-guides/terminology",
"en/engines/table-engines/integrations/time-series",
"en/engines/table-engines/special/keepermap",
"en/faq/general/columnar-database",
"en/faq/general/dbms-naming",
"en/faq/general",
"en/faq/general/mapreduce",
"en/faq/general/ne-tormozit",
"en/faq/general/olap",
"en/faq/general/who-is-using-clickhouse",
"en/faq/general/why-clickhouse-is-so-fast",
"en/faq/integration",
"en/faq/integration/json-import",
"en/faq/integration/oracle-odbc",
"en/faq/operations/delete-old-data",
"en/faq/operations",
"en/faq/operations/separate_storage",
"en/faq/use-cases",
"en/faq/use-cases/key-value",
"en/faq/use-cases/time-series",
"en/fast-release-24-2",
"en/getting-started",
"en/guides/best-practices/asyncinserts",
"en/guides/best-practices/avoidmutations",
"en/guides/best-practices/avoidnullablecolumns",
"en/guides/best-practices/avoidoptimizefinal",
"en/guides/best-practices/bulkinserts",
"en/guides/best-practices/partitioningkey",
"en/guides/best-practices/skipping-indexes",
"en/guides/best-practices/sparse-primary-indexes",
"en/guides/developer/alternative-query-languages",
"en/guides/developer/cascading-materialized-views",
"en/guides/developer/debugging-memory-issues",
"en/guides/developer/deduplicating-inserts-on-retries",
"en/guides/developer/deduplication",
"en/guides/developer/time-series-filling-gaps",
"en/guides/developer/ttl",
"en/guides/developer/understanding-query-execution-with-the-analyzer",
"en/guides/joining-tables",
"en/guides/sre/keeper",
"en/guides/sre/user-management/configuring-ldap",
"en/guides/sre/user-management",
"en/guides/sre/user-management/ssl-user-auth",
"en/integrations/data-ingestion/clickpipes/secure-kinesis",
"en/integrations/data-ingestion/data-formats/intro",
"en/integrations/data-ingestion/dbms/postgresql/data-type-mappings",
"en/integrations/data-ingestion/dbms/postgresql",
"en/integrations/data-ingestion/dbms/postgresql/inserting-data",
"en/integrations/data-ingestion/dbms/postgresql/postgres-vs-clickhouse",
"en/integrations/data-ingestion/dbms/postgresql/rewriting-postgres-queries",
"en/integrations/data-ingestion/etl-tools/apache-beam/readme",
"en/integrations/data-ingestion/kafka/confluent",
"en/integrations/data-ingestion/kafka/confluent/kafka-connect-http",
"en/integrations/data-ingestion/kafka/kafka-connect-jdbc",
"en/integrations/data-visualization/embeddable-and-clickhouse",
"en/materialized-view/refreshable-materialized-view",
"en/migrations/postgres/data-modeling-techniques",
"en/migrations/postgres/dataset",
"en/migrations/postgres/designing-schemas",
"en/operations/_troubleshooting",
"en/operations/analyzer",
"en/operations/external-authenticators",
"en/operations/system-tables",
"en/operations/utilities/clickhouse-copier",
"en/operations/utilities",
"en/settings/beta-and-experimental-features",
"en/sql-reference/aggregate-functions/reference/arrayconcatagg",
"en/sql-reference/aggregate-functions/reference/boundrat",
"en/sql-reference/data-types/json",
"en/sql-reference/data-types/nested-data-structures",
"en/sql-reference/dictionaries/_snippet_dictionary_in_cloud",
"en/sql-reference/dictionaries",
"en/sql-reference/functions/geo/polygon",
"en/sql-reference/table-functions/executable",
"en/sql-reference/transactions",
"en/tools-and-utilities/static-files-disk-uploader",
"en/use-cases/observability/demo-application",
"en/use-cases/observability/grafana",
"en/use-cases/observability",
"en/use-cases/observability/integrating-opentelemetry",
"en/use-cases/observability/managing-data",
"en/use-cases/observability/schema-design",

];

// Function to replace strings based on the mapping
function applyMapping(content, mapping) {
    console.log(content)
    const newContent = mapping[content]
        || mapping[removePrefixSlash(content)]
        || mapping['/' + content]
        || mapping[content + '/'];
    
    // console.log(newContent)
    
    if (!newContent) {
        console.log(`No mapping found for: ${content}`);
        return wrapWithQuotesAndTrailingComma(content);
    }

    return wrapWithQuotesAndTrailingComma(newContent)
}

function removePrefixSlash(str) {
    if (str.startsWith('/')) {
        return str.slice(1); // Remove the first character if it's a '/'
    }

    return str; // Return the string unchanged if there's no prefix slash
}

const wrapWithQuotesAndTrailingComma = (str) => `"${str}",`;


// console.log(mapping)

// Apply the mapping to each string in the array
let updatedArray = stringsArray.map(str => applyMapping(str, mapping));

// console.log(updatedArray)

// Join the array into a single string with newlines
let updatedContent = updatedArray.join('\n');

// console.log(updatedContent)

// Write the updated content to a new file
const outputFilePath = path.join(__dirname, 'outputFile.txt');
fs.writeFileSync(outputFilePath, updatedContent, 'utf8');

console.log(`Mapping applied successfully. Output written to ${outputFilePath}`);
