CREATE TABLE labels
(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE todo_labels
(
	id SERIAL PRIMARY KEY,
	-- REFERENCES: todo_id は todos.id に存在する値のみ許可 (INSERT/UPDATE 時に検証)
	-- DEFERRABLE INITIALLY DEFERRED: 検証を COMMIT 時まで遅延。
	--   1トランザクション内で todo_labels → todos の順に INSERT しても
	--   COMMIT 時点で整合していればエラーにならない。
	todo_id INTEGER NOT NULL REFERENCES todos (id) DEFERRABLE INITIALLY DEFERRED,
	label_id INTEGER NOT NULL REFERENCES labels (id) DEFERRABLE INITIALLY DEFERRED
);

