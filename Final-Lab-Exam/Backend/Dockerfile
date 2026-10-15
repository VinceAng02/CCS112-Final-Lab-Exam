FROM php:8.3-cli-alpine

RUN apk add --no-cache postgresql-dev icu-dev oniguruma-dev libzip-dev \
    && docker-php-ext-install pdo_pgsql mbstring bcmath intl zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html

COPY . .
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --optimize-autoloader

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

USER www-data
EXPOSE 8000
CMD ["sh", "-c", "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
