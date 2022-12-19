"""empty message

Revision ID: c27c88c63f42
Revises: 
Create Date: 2022-12-17 14:22:10.630681

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c27c88c63f42'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('artists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=20), nullable=False),
    sa.Column('last_name', sa.String(length=20), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('artistId', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['artistId'], ['artists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('albumId', sa.Integer(), nullable=True),
    sa.Column('review', sa.Text(), nullable=False),
    sa.Column('edited', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['albumId'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('artistId', sa.Integer(), nullable=True),
    sa.Column('albumId', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('lyrics', sa.String(), nullable=True),
    sa.Column('spotifySongId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['albumId'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['artistId'], ['artists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlistSongs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('songId', sa.Integer(), nullable=True),
    sa.Column('playlistId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['playlistId'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['songId'], ['songs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('playlistSongs')
    op.drop_table('songs')
    op.drop_table('reviews')
    op.drop_table('playlists')
    op.drop_table('albums')
    op.drop_table('users')
    op.drop_table('artists')
    # ### end Alembic commands ###