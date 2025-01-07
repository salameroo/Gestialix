<!DOCTYPE html>
<html>

<head>
    <title>Decodificar VIN</title>
</head>

<body>
    <h1>Decodificar VIN</h1>
    <form action="{{ route('decode-vin') }}" method="POST">
        @csrf
        <label for="vin">Introduce el VIN:</label>
        <input type="text" name="vin" id="vin" required maxlength="17">
        <button type="submit">Decodificar</button>
    </form>
</body>

</html>