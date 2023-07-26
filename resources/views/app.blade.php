<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords"
        content="Online shop, Pasar pintar, purbalingga, shopee, tokopedia, lazada, mudah aman terpercaya, jual beli, rembang">
    <meta name="description" content="Situs belanja online yang aman, nyaman dan terpercaya yang ada di Indonesia">
    <link rel="icon" type="image/x-icon"
        href="https://res.cloudinary.com/dbsgoesdj/image/upload/v1685780372/SAVE_20230603_101357_xyweww.jpg">

    <title inertia>{{ config('app.name', 'Pasar Pintar') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    {{-- percobaan minify tailwindcss --}}
    {{-- <link rel="stylesheet" href="{{ mix('css/final.css') }}"> --}}

    <!-- Scripts -->
    @routes
    <script src="{{ mix('js/app.js') }}" defer></script>
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
    {{-- @env('local')
      <script src="{{ mix('js/bundle.js') }}"></script>
    @endenv --}}
    <script defer src="{{ mix('js/flowbite.min.js') }}"></script>
    <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
    <script src="https://app-sandbox.duitku.com/lib/js/duitku.js"></script>

</body>

</html>
