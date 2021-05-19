FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app 

# copy csproj and restore as distinct layers
COPY *.sln .
COPY WebShop.Api/WebShop.Api.csproj WebShop.Api/
COPY Webshop.Database/Webshop.Database.csproj Webshop.Database/
COPY Webshop.Entities/Webshop.Entities.csproj Webshop.Entities/
COPY WebShop.Auth/WebShop.Auth.csproj WebShop.Auth/
COPY WebShop.Domain/WebShop.Domain.csproj WebShop.Domain/
COPY WebShop.Utils/WebShop.Utils.csproj WebShop.Utils/

RUN dotnet restore

# copy everything else and build app
COPY . ./
WORKDIR /app/WebShop.Api
RUN dotnet publish -c Release -o publish 

FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=build /app/WebShop.Api/publish  ./
ENTRYPOINT ["dotnet", "WebShop.Api.dll"]