import json

field_mapping = {
    'genre_name': 'name',
    'title': 'name'
}


input_file = './backup_bookchat.json'


with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)


def update_fields(obj):
    if 'fields' in obj:
        for old_field, new_field in field_mapping.items():
            if old_field in obj['fields']:
                obj['fields'][new_field] = obj['fields'].pop(old_field)

for obj in data:
    update_fields(obj)


with open(input_file, 'w', encoding='ascii') as f:
    json.dump(data, f, indent=4)
