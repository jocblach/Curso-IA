<?php
include('db.php'); 

$query = "SELECT id, nombre, correo, mensaje, fecha_hora FROM registros ORDER BY fecha_hora DESC";
$result = mysqli_query($conn, $query);
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Panel de Administración - IA Solutions</title>
  <link rel="stylesheet" href="../css/admin.css" />
</head>
<body>
  <div class="admin-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Mensaje</th>
          <th>Registrado</th>
        </tr>
      </thead>
      <tbody>
        <?php while ($row = mysqli_fetch_assoc($result)) : ?>
          <tr>
            <td><?= htmlspecialchars($row['id']) ?></td>
            <td><?= htmlspecialchars($row['nombre']) ?></td>
            <td><?= htmlspecialchars($row['correo']) ?></td>
            <td><?= htmlspecialchars($row['mensaje']) ?></td>
            <td><?= htmlspecialchars($row['fecha_hora']) ?></td>
          </tr>
        <?php endwhile; ?>
      </tbody>
    </table>
  </div>
</body>
</html>