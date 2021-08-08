DIR="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
GREEN='\033[0;32m'
GREY='\033[1;30m'
NOCOLOR='\033[0m' # No Color
# copy react-app
printf "${GREY}copying react-app to build...${NOCOLOR}"
cp -r node_modules/@stacks/react-app/build build/react-app
echo "${GREEN}react-app copied!${NOCOLOR}"

# copy services, reading from package.json
if ! command -v jq &> /dev/null
then
    echo "Installing jq..."
    brew install jq
fi

mkdir build/services &> /dev/null

for service in $(cat "$DIR/../package.json" | jq -r '.services[] '); do
    printf "${GREY}copying '$service' to build...${NOCOLOR}"
    arrIN=(${service//\// })
    service_name=${arrIN[1]}
    cp -r "node_modules/${service}/build" "build/services/${service_name}"
    cp -r "node_modules/${service}/node_modules" "build/services/${service_name}"
    echo "${GREEN}$service_name copied!${NOCOLOR}"
done