-- Ejecutar después de aplicar las migraciones. Resultados esperados con datos iniciales.
SELECT name FROM sys.tables; -- Generos, Miembros, Series, MiembroGeneros y el historial EF.
SELECT * FROM Miembros ORDER BY Nombre; -- Cuatro miembros.
SELECT s.Titulo, g.Nombre AS Genero, m.Nombre AS Miembro
FROM Series s JOIN Generos g ON g.Id=s.GeneroId JOIN Miembros m ON m.Id=s.MiembroId;
SELECT Estado, COUNT(*) AS Cantidad FROM Series GROUP BY Estado; -- Por ver 2, Viendo 1, Vista 2.
SELECT m.Nombre, COUNT(s.Id) AS Propuestas FROM Miembros m LEFT JOIN Series s ON s.MiembroId=m.Id GROUP BY m.Nombre;
SELECT m.Nombre AS Miembro, g.Nombre AS Genero FROM MiembroGeneros mg
JOIN Miembros m ON m.Id=mg.MiembroId JOIN Generos g ON g.Id=mg.GeneroId ORDER BY m.Nombre,g.Nombre;
-- Experimentos: ejecutar por separado; todos DEBEN ser rechazados.
-- E1: referencia a miembro inexistente.
-- INSERT INTO Series(Titulo,Temporadas,Estado,GeneroId,MiembroId) VALUES(N'Fantasma',1,N'Por ver',1,99);
-- E2: correo duplicado.
-- INSERT INTO Miembros(Nombre,Correo,Registro) VALUES(N'Otra Ana',N'ana@club.com','2026-11-12');
-- E3: estado ajeno al CHECK.
-- INSERT INTO Series(Titulo,Temporadas,Estado,GeneroId,MiembroId) VALUES(N'Prueba',1,N'Terminada',1,1);
-- E4: miembro con series; Restrict impide borrarlo.
-- DELETE FROM Miembros WHERE Id=4;
